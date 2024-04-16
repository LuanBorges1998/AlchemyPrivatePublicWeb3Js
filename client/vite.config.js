import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {keccak256} from "ethereum-cryptography/keccak"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
