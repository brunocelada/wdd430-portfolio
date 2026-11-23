
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

function promptHidden(message) {
    return new Promise((resolve, reject) => {
        if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
            reject(new Error("Run this script from an interactive terminal."));
            return;
        }

        let value = "";

        const cleanup = () => {
            stdin.removeListener("data", onData);
            stdin.setRawMode(false);
            stdin.pause();
        };

        const onData = (chunk) => {
            for (const char of chunk.toString("utf8")) {
                if (char === "\u0003") {
                    cleanup();
                    stdout.write("\n");
                    reject(new Error("Operation cancelled."));
                    return;
                }

                if (char === "\r" || char === "\n") {
                    cleanup();
                    stdout.write("\n");
                    resolve(value);
                    return;
                }

                if (char === "\u007f" || char === "\b") {
                    value = value.slice(0, -1);
                    continue;
                }

                if (char >= " ") {
                    value += char;
                }
            }
        };

        stdout.write(message);
        stdin.setRawMode(true);
        stdin.resume();
        stdin.on("data", onData);
    });
}

async function main() {
    const rl = createInterface({ input: stdin, output: stdout });

    const name = (await rl.question("Owner name: ")).trim();
    const email = (await rl.question("Owner email: "))
        .trim()
        .toLowerCase();

    rl.close();

    if (!name) {
        throw new Error("Name is required.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address.");
    }

    const password = await promptHidden("Password (minimum 8 characters): ");
    const confirmation = await promptHidden("Confirm password: ");

    if (password.length < 8) {
        throw new Error("Password must contain at least 8 characters.");
    }

    if (password !== confirmation) {
        throw new Error("Passwords do not match.");
    }

    const existingUser = await sql`
    SELECT id
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

    if (existingUser.rows.length > 0) {
        throw new Error("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${name}, ${email}, ${passwordHash})
    RETURNING id
  `;

    console.log(
        `Owner account created successfully. ID: ${result.rows[0].id}`,
    );
}

main().catch((error) => {
    console.error("Failed to create owner:", error.message);
    process.exitCode = 1;
});
