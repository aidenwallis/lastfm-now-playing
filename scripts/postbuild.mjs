/**
 * This script runs once Astro has built the main `dist` directory.
 *
 * It renames the HTML files into a "Cloudflare-compatible" format, then
 * cleans up any unneeded directories
 */

import { renameSync, rmdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// This is the actual index file, Cloudflare Transform Rules kick in before Pages gets the request,
// which remaps "/" to "/home", thus letting this route succeed.
renameSync(resolve(__dirname, "../dist/index.html"), "dist/home.html");

// Trick Cloudflare Pages into routing the fallback html page here
renameSync(resolve(__dirname, "../dist/*/index.html"), "dist/index.html");

rmdirSync(resolve(__dirname, "../dist/*/"), { recursive: true });
