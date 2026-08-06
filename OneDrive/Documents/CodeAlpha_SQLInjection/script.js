// ===============================
// Secure Authentication Dashboard
// CodeAlpha Task 2
// Part 1 of 4
// ===============================

// Replace with your own Supabase credentials
const SUPABASE_URL = "https://ghezqzhlxhqaikmpfsev.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_XyQvq3BFsnIdh6cX448SiA_8KSaA8qr";

// AES Secret Key (Demo)
const AES_SECRET_KEY = "CodeAlpha_Task2_AES256_Key";

// Form Elements
const form = document.getElementById("registerForm");
const result = document.getElementById("result");

// SQL Injection Detection Patterns
const sqlPatterns = [

    /('|--|;|\/\*|\*\/)/i,

    /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|UNION|EXEC|OR|AND)\b/i

];

// ===============================
// Show Result Message
// ===============================

function showMessage(message, type) {

    result.style.display = "block";

    result.className = type;

    result.textContent = message;

}

// ===============================
// SQL Injection Detection
// ===============================

function containsSQLInjection(text) {

    return sqlPatterns.some(pattern => pattern.test(text));

}

// ===============================
// Encrypt Username (AES-256)
// ===============================

function encryptUsername(username) {

    return CryptoJS.AES.encrypt(

        username,

        AES_SECRET_KEY

    ).toString();

}

// ===============================
// Hash Password (SHA-256)
// ===============================

function hashPassword(password) {

    return CryptoJS.SHA256(password).toString();

}

// ===============================
// Form Submit Event Starts Here
// ===============================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = document
        .getElementById("username")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("password")
        .value;

    // Check Empty Fields

    if (!username || !email || !password) {

        showMessage(

            "⚠ Please fill all fields.",

            "warning"

        );

        return;

    }
    // SQL Injection Validation

    if (

        containsSQLInjection(username) ||

        containsSQLInjection(email) ||

        containsSQLInjection(password)

    ) {

        showMessage(

            "🚫 SQL Injection attempt detected! Registration blocked.",

            "error"

        );

        return;

    }

    // Encrypt Username

    const encryptedUsername = encryptUsername(username);

    // Hash Password

    const hashedPassword = hashPassword(password);

    try {

        // Check Existing User

        const checkResponse = await fetch(

            `${SUPABASE_URL}/rest/v1/secure_users?email=eq.${encodeURIComponent(email)}&select=*`,

            {

                method: "GET",

                headers: {

                    "apikey": SUPABASE_ANON_KEY,

                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`

                }

            }

        );

        if (!checkResponse.ok) {

            throw new Error(

                "Unable to connect to database."

            );

        }

        const existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {

            showMessage(

                "⚠ User already exists.",

                "warning"

            );

            return;

        }
        // Insert New User into Supabase

        const insertResponse = await fetch(

            `${SUPABASE_URL}/rest/v1/secure_users`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "apikey": SUPABASE_ANON_KEY,

                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,

                    "Prefer": "return=representation"

                },

                body: JSON.stringify({

                    username: encryptedUsername,

                    email: email,

                    password: hashedPassword

                })

            }

        );

        if (!insertResponse.ok) {

            const error = await insertResponse.json();

            throw new Error(

                error.message ||

                "Unable to register user."

            );

        }

        showMessage(

            "✅ Registration Successful! Username encrypted, password hashed and data securely stored.",

            "success"

        );

        form.reset();

        }

    catch (error) {

        console.error(error);

        showMessage(

            "❌ " + error.message,

            "error"

        );

    }

});

// ===============================
// End of Script
// ===============================