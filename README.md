# Electron Application with Puppeteer Integration

This application demonstrates how to integrate Puppeteer with Electron to perform automated tasks like logging into a website and loading specific content.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Google Chrome installed (for Puppeteer to work).

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

### Running the Application

To start the Electron application:

```bash
npm start
```

### Usage

1. Upon launching, the Electron window opens and automatically logs into "https://web3.career".
2. After successful login, it navigates to "https://web3.career/learn-web3" and restricts navigation to other URLs.

### Features

- **Automated Login**: Uses Puppeteer to simulate login actions.
- **Secure Navigation**: Prevents navigation outside of allowed URLs.

## Development

### Built With

- [Electron](https://www.electronjs.org/)
- [Puppeteer](https://pptr.dev/)

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


### Customization

Feel free to modify and expand the sections based on your specific application's features and requirements. Add sections for troubleshooting, additional setup instructions, or any other relevant information.
