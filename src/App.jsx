import './App.css'
import SuggestionForm from './SuggestionForm'
import SuggestionFeed from './components/SuggestionFeed'
import AdminPanel from './components/AdminPanel'
import AuthForm from './components/AuthForm'

function App() {
  return (
    <><head>
      <title>Milan for Secretary Suggestion Box</title>
    </head>
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Milan for Secretary</h1>
        <h2 className="text-2xl  mb-4">Agenda Suggestion Box</h2>
        <h3 className="text-1x1  mb-4">What do you want ASB to do? While I cannot guarantee these suggestions, I will fight for the ones I can</h3>
        <SuggestionForm />
        <SuggestionFeed />
      </div></>
  )
}

export default App

