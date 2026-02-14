#!/bin/bash

# ========================================================================
# CRIMINAL INVESTIGATION DATABASE MANAGEMENT SYSTEM - LAUNCHER SCRIPT
# ========================================================================
#
# This script launches the Criminal Investigation Database Management System.
# It installs dependencies if needed and starts the server.
#
# USAGE:
# 1. Make this script executable: chmod +x start-cid.sh
# 2. Run it: ./start-cid.sh
#
# ========================================================================

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================================================${NC}"
echo -e "${GREEN}CRIMINAL INVESTIGATION DATABASE MANAGEMENT SYSTEM${NC}"
echo -e "${GREEN}========================================================================${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js to run this application.${NC}"
    echo "Visit https://nodejs.org/ to download and install Node.js."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "app.js" ]; then
    echo -e "${YELLOW}Please run this script from the cid-system directory.${NC}"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
    
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}Failed to install dependencies. Please run 'npm install' manually.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Dependencies installed successfully.${NC}"
fi

echo ""
echo -e "${GREEN}Starting the CID System...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo ""

# Start the server
node app.js

# This line will only execute if the server stops
echo ""
echo -e "${GREEN}Server stopped.${NC}"