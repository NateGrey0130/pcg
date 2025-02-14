
import { Client, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite API endpoint
    .setProject("67aec19b0015f3ad5017"); // Replace with your Project ID

const account = new Account(client);

// Expose globally
window.appwrite = { client, account };

console.log("✅ Appwrite Initialized!");
