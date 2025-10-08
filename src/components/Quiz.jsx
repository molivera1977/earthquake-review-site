import React, { useMemo, useState } from 'react'

function shuffle(arr){
  return [...arr].sort(()=>Math.random()-0.5)
}

export default function Quiz({title, questions, showChoicesLetters=true}){
  const randomized = useMemo(()=>shuffle(questions), [questions])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = randomized[index]

  function choose(c){
    if(selected!==null) return
    setSelected(c)
    if(c===q.answer) setScore(s=>s+1)
  }
  function next(){
    if(index+1<randomized.length){
      setIndex(i=>i+1); setSelected(null)
    }else{
      setDone(true)
    }
  }
  function back(){
    if(index>0){ setIndex(i=>i-1); setSelected(null) }
  }
  function restart(){
    setIndex(0); setSelected(null); setScore(0); setDone(false)
  }

  const percent = Math.round((score/randomized.length)*100)

  if(done){
    let msg = 'Nice work—keep practicing!'
    if(percent>=90) msg = 'Excellent work!'
    else if(percent>=75) msg = 'Great job!'
    else if(percent<50) msg = 'Keep at it—you\'re learning!'

    return (<div className="card">
      <h2>{title} — Results</h2>
      <p className="lg"><strong>Score:</strong> {score} / {randomized.length} <span className="badge">{percent}%</span></p>
      <p>{msg}</p>
      <div className="btns"><button className="btn" onClick={restart}>Restart</button></div>
    </div>)
  }

  const progress = ((index)/randomized.length)*100

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="meta">
        <div>Question {index+1} / {randomized.length}</div>
        <div>Score: {score}</div>
      </div>
      <div className="progressWrap"><div className="progress" style={{width:progress+'%'}}/></div>
      <p className="lg" style={{marginTop:12}}>{q.prompt}</p>
      {q.choices && q.choices.map((c, i)=>{
        const isCorrect = selected!==null && c===q.answer
        const isWrong = selected!==null && c!==q.answer && c===selected
        const cls = 'choice '+(isCorrect?'correct':'')+(isWrong?' incorrect':'')
        const label = showChoicesLetters ? String.fromCharCode(65+i)+') ' : ''
        return <div key={i} className={cls} onClick={()=>choose(c)}>{label}{c}</div>
      })}
      {selected!==null && (
        <p style={{marginTop:8}}>
          {selected===q.answer ? '✅ Correct!' : '❌ Try again next time.'}
          {q.explain ? <span style={{marginLeft:8,color:'#555'}}> {q.explain}</span> : null}
        </p>
      )}
      <div className="nav">
        <button className="btn" onClick={back} disabled={index===0}>Back</button>
        <button className="btn" onClick={next}>{index===randomized.length-1?'Finish':'Next'}</button>
      </div>
    </div>
  )
}
