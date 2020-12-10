import { useState, useContext } from 'react'
import { useHttp } from '../../../hook/useHttp'
import { SERVER_URL } from '../../../storage'
import { GlobalState } from '../../GlobalState'

function AddItem(props){

  const [ newItem, setNewItem ] = useState({
    name:"",
    price:"0",
    type:"electronics",
    good_imageURL:"",
    description:""
  })

//  GlobalState
  const { currentUser, setCurrentGoods } = useContext( GlobalState )
  const handleGetNewItemData = (e) => {
    const { name, value } = e.target
    setNewItem({
      ...newItem,
      [name]:value
    })
  }

  const { loading, information } = useHttp()

  const handleAddNewItemToStore = async () => {
    const storeId = currentUser._id
    try {
      // const newGood
      const item = await information(
        `${ SERVER_URL }/profile/items/add`,
        "POST",
        { ...newItem, storeId },
        { "candidate_token": await localStorage.getItem('cand_token') }
      )
      document.querySelector("#closeAddItem").click()
      await setCurrentGoods()
      if( item ){
        setNewItem({
          name:"",
          price:"0",
          type:"electronics",
          good_imageURL:"",
          description:""
        })
      }
    } catch (err) {
      if(err) throw err
    }
  }

  return (
    <>
      <div {...props}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add item</h5>
              <button disabled={loading} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                  </div>
                  <input autoComplete={"off"} placeholder="..." name={"name"} value={ newItem.name } onChange={ (e) => {handleGetNewItemData(e)} } type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Pri ($)</span>
                  </div>
                  <input autoComplete={"off"} placeholder="..." name={"price"} value={ newItem.price } onChange={ (e) => {handleGetNewItemData(e)} } type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text">Categ</label>
                  </div>
                  <select className="custom-select" value={ newItem.type } onChange={ (e) => {handleGetNewItemData(e)} } name={"type"} id="inputGroupSelect01">
                    <option value="electronics">Electronics</option>
                    <option value="foods">Foods</option>
                    <option value="books">Books</option>
                    <option value="clothes">Clothes</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">image</span>
                  </div>
                  <input autoComplete={"off"} className="form-control" placeholder="..." name={"good_imageURL"} value={ newItem.good_imageURL } onChange={ (e) => {handleGetNewItemData(e)} } type="text" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>
                <div className="input-group">
                  <textarea name={"description"} rows={4} value={ newItem.description } onChange={ (e) => {handleGetNewItemData(e)} } placeholder="Enter description..." className="form-control" aria-label="With textarea"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button disabled={loading} type="button" className="btn btn-primary" onClick={ () => {handleAddNewItemToStore()} } >Add</button>
              <button disabled={loading} type="button" id={"closeAddItem"} className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddItem