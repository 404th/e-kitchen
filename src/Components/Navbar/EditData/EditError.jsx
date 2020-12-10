




function EditError (props) {
  return (
    <>
      <div {...props}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger" id="exampleModalLabel">You are not logged in</h5>
              <button type="button" className="close error_closing_button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* <div className="modal-body">
              <h1 className='text-danger' >You are not logged in!</h1>
            </div> */}
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}


export default EditError