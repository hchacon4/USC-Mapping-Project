// Put your exportable React components here.
import React from 'react';
// import dotenv from 'dotenv';
// import 'dotenv/config';
// import meta from 'meta';

// console.log(import.meta.env.API_URL)

// Create process object. `config()` loads environment variables from `.env` file and creates process object.
// dotenv.config();

// Load API_URL string.
// const apiUrl = process.env.API_URL;

// interface HelloWorldProps {
//   greetee?: string; // '?' indicates that greetee is optional
// }

// export default function HelloWorld(prop: { greetee: string }) {
//   const {
//     greetee = 'World'
//   } = prop

//   return (
//     <div>Hello, {greetee}!</div>
//   )
// }

// const HelloWorld: React.FC<{ greetee?: string }> = ({ greetee = 'World' }) => {
//   return (
//     <div>Hello, {greetee}!</div>
//   );
// };

const HelloWorld: React.FC = () => {
  return (
    <div>Hello, World!</div>
  )
}

const ApiUrl: React.FC = () => {
  return (
    // <div>API URL: {import.meta.env.API_URL}</div>
    <div>API URL: {process.env.API_URL}</div>
  )
}

// Testing a project component.
import Accordion from "react-bootstrap/Accordion";
// import { dot } from 'node:test/reporters';
function Assessment_History() {
// const Assessment_History: React.FC = () => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Assessment History</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

// Assessment_History();   // Included to bypass lint error.
// end testing

export { HelloWorld };
export { ApiUrl };
export { Assessment_History };