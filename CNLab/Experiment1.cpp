#include <iostream>
#include <cstdlib>
using namespace std;

int main() {
    int choice;
    do {
        cout << "Basic Networking Commands Menu\n";
        cout << "1. Ping a Website\n";
        cout << "2. Display IP Configuration\n";
        cout << "3. Trace Route to Website\n";
        cout << "4. Exit\n";
        cout << "Enter your choice (1-4): ";
        cin >> choice;

        switch (choice) {
            case 1: {
                string website;
                cout << "Enter website or IP to ping: ";
                cin >> website;
                string command = "ping " + website;
                system(command.c_str());
                break;
            }
            case 2: {
                // Use 'ipconfig' for Windows, 'ifconfig' or 'ip a' for Linux
                cout << "Showing IP configuration...\n";
#if defined(_WIN32) || defined(_WIN64)
                system("ipconfig");
#else
                system("ifconfig");
#endif
                break;
            }
            case 3: {
                string website;
                cout << "Enter website or IP for traceroute: ";
                cin >> website;
#if defined(_WIN32) || defined(_WIN64)
                string command = "tracert " + website;
#else
                string command = "traceroute " + website;
#endif
                system(command.c_str());
                break;
            }
            case 4:
                cout << "Exiting program.\n";
                break;
            default:
                cout << "Invalid choice! Try again.\n";
        }
        cout << "\n";
    } while (choice != 4);

    return 0;
}
