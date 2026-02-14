#!/bin/bash

# ========================================================================
# CRIMINAL INVESTIGATION DATABASE MANAGEMENT SYSTEM - DEPLOYMENT SCRIPT
# ========================================================================
#
# This script deploys the CID System on a live server.
# It installs dependencies, configures the environment, and starts the server.
#
# USAGE:
# 1. Make this script executable: chmod +x deploy.sh
# 2. Run it: ./deploy.sh
#
# ========================================================================

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================================================${NC}"
echo -e "${GREEN}CRIMINAL INVESTIGATION DATABASE MANAGEMENT SYSTEM - DEPLOYMENT${NC}"
echo -e "${GREEN}========================================================================${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Installing Node.js...${NC}"
    
    # Check if we're on a Debian/Ubuntu system
    if command -v apt-get &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
        sudo apt-get install -y nodejs
    # Check if we're on a RHEL/CentOS/Fedora system
    elif command -v yum &> /dev/null; then
        curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
        sudo yum install -y nodejs
    else
        echo -e "${RED}Automatic Node.js installation not supported on this system.${NC}"
        echo -e "${YELLOW}Please install Node.js manually from https://nodejs.org/${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Node.js installed successfully.${NC}"
fi

# Check if we're in the right directory
if [ ! -f "app.js" ]; then
    echo -e "${RED}Please run this script from the cid-system directory.${NC}"
    exit 1
fi

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}Installing PM2 process manager...${NC}"
    sudo npm install -g pm2
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install PM2. Please run 'sudo npm install -g pm2' manually.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}PM2 installed successfully.${NC}"
fi

# Install dependencies
echo -e "${YELLOW}Installing application dependencies...${NC}"
npm install --production

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies. Please check the error messages above.${NC}"
    exit 1
fi

echo -e "${GREEN}Dependencies installed successfully.${NC}"

# Check if port 3000 is already in use
if netstat -tuln | grep -q ":3000 "; then
    echo -e "${YELLOW}Port 3000 is already in use. Stopping any existing processes...${NC}"
    pm2 delete cid-system 2>/dev/null
    
    # If PM2 didn't work, try to kill the process directly
    PID=$(lsof -t -i:3000)
    if [ ! -z "$PID" ]; then
        echo -e "${YELLOW}Killing process $PID using port 3000...${NC}"
        kill -9 $PID
    fi
fi

# Start the application with PM2
echo -e "${YELLOW}Starting the CID System with PM2...${NC}"
pm2 start app.js --name cid-system

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to start the application with PM2. Please check the error messages above.${NC}"
    exit 1
fi

# Save the PM2 process list so it restarts on server reboot
pm2 save

# Configure PM2 to start on system boot
echo -e "${YELLOW}Configuring PM2 to start on system boot...${NC}"
pm2 startup

echo ""
echo -e "${GREEN}========================================================================${NC}"
echo -e "${GREEN}DEPLOYMENT COMPLETE${NC}"
echo -e "${GREEN}========================================================================${NC}"
echo ""
echo -e "The CID System is now running on port 3000."
echo -e "You can access it at: ${YELLOW}http://$(hostname -I | awk '{print $1}'):3000${NC}"
echo ""
echo -e "To monitor the application:"
echo -e "  ${YELLOW}pm2 status${NC}"
echo ""
echo -e "To view logs:"
echo -e "  ${YELLOW}pm2 logs cid-system${NC}"
echo ""
echo -e "To stop the application:"
echo -e "  ${YELLOW}pm2 stop cid-system${NC}"
echo ""
echo -e "To restart the application:"
echo -e "  ${YELLOW}pm2 restart cid-system${NC}"
echo ""