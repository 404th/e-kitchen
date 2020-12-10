
function EditInput(props) {

  const {
    forEnter,
    inputId,
    type,
    classNames,
    ariaDescribedBy,
    pholder,
    smId,
    smClassNames,
    smField,
    onChange,
    name,
    value,
    disabled
  } = props
  return (
    <>
      <div className="form-group">
        <label style={{ fontWeight:"bolder" }} >{ forEnter }</label>
        <input
          autoComplete={"off"}
          disabled={disabled}
          name={name}
          value={ value }
          onChange={ (c) => onChange( c ) }
          type={type}
          className={classNames}
          id={inputId}
          aria-describedby={ariaDescribedBy}
          placeholder={pholder}
        />
        <span id={smId} className={smClassNames} style={{ fontWeight:"bold" }}>{smField}</span>
      </div>
    </>
  )
}

export default EditInput