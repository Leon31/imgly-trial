
function StyleButton ({styleName, setStyleSelection, icon, active}) {
  return (
    <button 
      style={{background: active ? '#eee' : '#fff'}} 
      onClick={()=>setStyleSelection(styleName)} >
        <span className={styleName}>{icon}</span>
    </button> 
  )
}

export default StyleButton;