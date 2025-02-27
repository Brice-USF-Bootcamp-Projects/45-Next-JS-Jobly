// src/app/layout.js

import NavBar from '../components/NavBar';
import './globals.css';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add any custom meta tags, title, or other head elements */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Jobly</title>
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}

