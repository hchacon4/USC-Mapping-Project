// Put your exportable React components here.
import React from 'react'

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

export default HelloWorld;