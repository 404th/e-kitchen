import { useContext } from 'react'
import "./home.css"
// import { GlobalState } from '../GlobalState'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import RangeMoneyFilter from './RangeMoneyFilter/RangeMoneyFilter'
import Items from './Items/Items'
import { GlobalState } from '../GlobalState'

const Home = () => {
  const { goodsFilter, setGoodsFilter, setGoodsFilterAll } = useContext( GlobalState )

    const handleChange = async (event) => {
      await setGoodsFilter(event)
    };

    const handleSetAll = async (e) => {
      await setGoodsFilterAll(e)
    };

  return (
    <div>
      <div className="container-fluid p-0">
        <div className="home_container_row row m-0">
          <div className="cover_sidebar__cover col-lg-3 col-md-4 col-sm-12">
            <div className="sidebar__cover">
              <div className="sidebar__cover_filter p-5">
                <h3>Filter</h3>
              </div>
              <div className="sidebar__cover_item_all px-5 py-1 mb-5">
                <FormControlLabel
                  control={ <Checkbox checked={goodsFilter.checkedA} onChange={handleSetAll} name="checkedA" color="secondary"/> }
                  label="All"
                  color="secondary"
                />
              </div>
              <div className="sidebar__cover_item px-5 py-1">
                <FormControlLabel
                  control={ <Checkbox checked={goodsFilter.checkedB} onChange={handleChange} name="checkedB" color="primary"/> }
                  label="Electronics"
                /> 
                <Divider/>
              </div>
              <div className="sidebar__cover_item px-5 py-1">
                <FormControlLabel
                  control={ <Checkbox checked={goodsFilter.checkedC} onChange={handleChange} name="checkedC" color="primary"/> }
                  label="Foods"
                />
                <Divider/>
              </div>
              <div className="sidebar__cover_item px-5 py-1">
                <FormControlLabel
                  control={ <Checkbox checked={goodsFilter.checkedD} onChange={handleChange} name="checkedD" color="primary"/> }
                  label="Books"
                />
                <Divider/>
              </div>
              <div className="sidebar__cover_item px-5 py-1">
                <FormControlLabel
                  control={ <Checkbox checked={goodsFilter.checkedE} onChange={handleChange} name="checkedE" color="primary"/> }
                  label="Cars"
                />
                <Divider/>
              </div>
              <div className="sidebar__cover_filter_money py-5 px-5 mt-5">
                <RangeMoneyFilter />
              </div>
            </div>
          </div>
          <div className="cover_items_box p-lg-5 p-md-3 p-sm-1 col-lg-9 col-md-8 col-sm-12">
            <div className="items_box" >
              <Items />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
