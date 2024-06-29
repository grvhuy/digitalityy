// "use client"
// import { useState } from 'react';

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: 'bot', text: 'Hi! How can I help you today?', isQuestion: false },
//     { from: 'bot', text: 'Choose one of the following questions:', isQuestion: false },
//     { from: 'bot', text: 'What are your store hours?', isQuestion: true },
//     { from: 'bot', text: 'Do you offer free shipping?', isQuestion: true },
//     { from: 'bot', text: 'How can I track my order?', isQuestion: true },
//   ]);
//   const [input, setInput] = useState('');

//   const toggleChatbot = () => setIsOpen(!isOpen);

//   const handleQuestionClick = (question: string) => {
//     addMessage('user', question, false);
//     handleBotResponse(question);
//   };

//   const handleSend = () => {
//     if (input.trim() === '') return;

//     addMessage('user', input, false);
//     handleBotResponse(input);
//     setInput('');
//   };

//   const handleBotResponse = (userInput: string) => {
//     setTimeout(() => {
//       const botResponse = getBotResponse(userInput);
//       addMessage('bot', botResponse, false);
//       addMessage('bot', 'Choose one of the following questions:', false);
//       addQuestions();
//     }, 500);
//   };

//   const addMessage = (from: 'bot' | 'user', text: string, isQuestion: boolean) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { from, text, isQuestion },
//     ]);
//   };

//   const addQuestions = () => {
//     const questions = [
//       'What are your store hours?',
//       'Do you offer free shipping?',
//       'How can I track my order?',
//       // Add more questions as needed
//     ];
//     questions.forEach(question => addMessage('bot', question, true));
//   };

//   const getBotResponse = (userInput: string) => {
//     // Define your question-answer pairs here
//     const qaPairs: { [key: string]: string } = {
//       'what are your store hours?': 'We are open from 9am to 9pm every day.',
//       'do you offer free shipping?': 'Yes, we offer free shipping on orders over $50.',
//       'how can i track my order?': 'You can track your order using the tracking number sent to your email.',
//       // Add more Q&A pairs as needed
//     };

//     return qaPairs[userInput.toLowerCase()] || "I'm sorry, I didn't understand that. Can you rephrase?";
//   };

//   return (
//     <div className="fixed bottom-4 right-4">
//       <button
//         onClick={toggleChatbot}
//         className="bg-blue-500 text-white p-2 rounded-full"
//       >
//         {isOpen ? 'Close Chat' : 'Chat with us!'}
//       </button>
//       {isOpen && (
//         <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-80 mt-2">
//           <div className="p-4">
//             <div className="h-64 overflow-y-scroll mb-4">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`my-2 ${msg.from === 'bot' ? 'text-left' : 'text-right'}`}>
//                   {msg.isQuestion ? (
//                     <button
//                       onClick={() => handleQuestionClick(msg.text)}
//                       className="text-blue-500 hover:underline"
//                     >
//                       {msg.text}
//                     </button>
//                   ) : (
//                     <span className={`inline-block p-2 rounded-lg ${msg.from === 'bot' ? 'bg-gray-200' : 'bg-blue-200'}`}>
//                       {msg.text}
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <div className="flex">
//               <input
//                 type="text"
//                 className="border border-gray-300 rounded-lg p-2 flex-1 mr-2"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                 placeholder="Ask a question..."
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-blue-500 text-white p-2 rounded-lg"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
