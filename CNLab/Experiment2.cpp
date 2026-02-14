#include <iostream>
#include <cstdlib>
#include <ctime>
#include <thread>
#include <chrono>

using namespace std;

// Simulate delay in milliseconds
void delay(int milliseconds) {
    this_thread::sleep_for(chrono::milliseconds(milliseconds));
}

int main() {
    srand(time(0));

    int totalFrames;
    cout << "Enter total number of frames to send: ";
    cin >> totalFrames;

    int frame = 1;
    while (frame <= totalFrames) {
        cout << "\nSender: Sending Frame " << frame << "..." << endl;

        // Simulate transmission delay
        delay(500);

        // Randomly decide if frame/ACK is lost
        bool ackLost = rand() % 4 == 0;  // 25% chance ACK is lost
        bool frameLost = rand() % 5 == 0; // 20% chance frame is lost

        if (frameLost) {
            cout << "Receiver: Frame " << frame << " lost in transmission!" << endl;
            cout << "Sender: Timeout, resending Frame " << frame << "..." << endl;
            delay(1000);
            continue; // Resend same frame
        }

        cout << "Receiver: Frame " << frame << " received successfully." << endl;
        delay(500);

        if (ackLost) {
            cout << "Receiver: ACK for Frame " << frame << " lost!" << endl;
            cout << "Sender: Timeout, resending Frame " << frame << "..." << endl;
            delay(1000);
            continue; // Resend same frame
        } else {
            cout << "Receiver: Sending ACK for Frame " << frame << endl;
        }

        cout << "Sender: ACK for Frame " << frame << " received." << endl;
        frame++;
        delay(500);
    }

    cout << "\nAll frames sent and acknowledged successfully!" << endl;
    return 0;
}

#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand(time(0));  // Seed for random number generation

    int totalFrames;
    cout << "Enter total number of frames to send: ";
    cin >> totalFrames;

    int frame = 1;

    while (frame <= totalFrames) {
        cout << "\nSender: Sending Frame " << frame << "..." << endl;

        // Random chance of frame loss
        int frameLost = rand() % 5;   // 1 out of 5 chance (20%)
        if (frameLost == 0) {
            cout << "Receiver: Frame " << frame << " lost during transmission!" << endl;
            cout << "Sender: Timeout! Resending Frame " << frame << "..." << endl;
            continue; // Resend the same frame
        }

        cout << "Receiver: Frame " << frame << " received successfully." << endl;

        // Random chance of ACK loss
        int ackLost = rand() % 4;   // 1 out of 4 chance (25%)
        if (ackLost == 0) {
            cout << "Receiver: ACK for Frame " << frame << " lost!" << endl;
            cout << "Sender: Timeout! Resending Frame " << frame << "..." << endl;
            continue; // Resend same frame again
        }

        cout << "Receiver: Sending ACK for Frame " << frame << endl;
        cout << "Sender: ACK for Frame " << frame << " received." << endl;

        frame++; // Move to next frame
    }

    cout << "\nAll frames sent and acknowledged successfully!" << endl;
    return 0;
}
