import React, { useState } from 'react'
import Quiz from './components/Quiz.jsx'
import { vocabQuestions } from './data/vocab.js'
import { compMC, compFill, compShort } from './data/comprehension.js'
import { clozeQuestions } from './data/cloze.js'

const Home = ({go}) => (
  <div className="card">
    <img src="/earthquakes-review-site/cover.png" alt="Earthquakes cover" className="cover" />
    <h2 style={{color:'var(--brown)'}}>Earthquakes – Story Review</h2>
    <p className="sub">Based on <em>Earthquakes</em> by Sneed B. Collard III</p>
    <div className="btns">
      <button className="btn" onClick={()=>go('vocab')}>Vocabulary Review</button>
      <button className="btn" onClick={()=>go('comp')}>Comprehension Review</button>
      <button className="btn" onClick={()=>go('cloze')}>Cloze Review</button>
    </div>
  </div>
)

function CompShortAnswer(){
  return (
    <div className="card">
      <h3>Short Answer Practice</h3>
      <ol>
        {compShort.map((q,i)=>(<li key={i} style={{margin:'12px 0'}}>{q}</li>))}
      </ol>
      <p className="sub">Tip: Use text evidence and quote the article when you can.</p>
    </div>
  )
}

export default function App(){
  const [view, setView] = useState('home')

  return (
    <>
      <header>
        <div className="container">
          <h1>Earthquakes – Story Review</h1>
          <div className="sub">Vocabulary • Comprehension • Cloze</div>
        </div>
      </header>
      <main className="container">
        {view==='home' && <Home go={setView}/>}
        {view==='vocab' && (<>
          <Quiz title="Vocabulary Review" questions={vocabQuestions} />
          <div className="btns"><button className="btn" onClick={()=>setView('home')}>Back to Home</button></div>
        </>)}
        {view==='cloze' && (<>
          <Quiz title="Cloze Review" questions={clozeQuestions} />
          <div className="btns"><button className="btn" onClick={()=>setView('home')}>Back to Home</button></div>
        </>)}
        {view==='comp' && (<>
          <Quiz title="Comprehension — Multiple Choice" questions={compMC} />
          <Quiz title="Comprehension — Fill in the Blank" questions={compFill} />
          <CompShortAnswer />
          <div className="btns"><button className="btn" onClick={()=>setView('home')}>Back to Home</button></div>
        </>)}
      </main>
      <footer>Built for classroom practice • React + Vite</footer>
    </>
  )
}
