import { useEffect, useState } from "react";
import Icon from "./Icon";
import TextInput from "./TextInput";
/*
import OrderStatus from "../objects/OrderStatus";
import CurrencyConverter from "../objects/CurrencyConverter";
import DateHelper from "../objects/DateHelper";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
*/


export default function Table({ 
  columns=[], 
  data = [], 
  handler, 
  classes = '' ,
  actions = [],
  emptyText = false
}) {
  const [sorter, setSorter] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [order, setOrder] = useState('asc');
  const [curPage, setCurPage] = useState(0);
  const [pageCount, setPageCount] = useState(chunkArray(data, pageSize).length);

  

  useEffect(() => {
    setPageCount(chunkArray(data, pageSize).length);
  }, [data, pageSize])

  function chunkArray(array, itemsPerPage) {
    const chunkSize = itemsPerPage;
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        chunkedArray.push(chunk);
    }
    return chunkedArray;
  }

  const changeOrder = (order) => {
    if(!order) {
      setOrder(prevOrder => prevOrder === 'asc'? 'desc' : 'asc');
    } else {
      setOrder(order);
    }
  }

  const getActions = (item) => {
    return (
      <td className="valign-wrapper center-align">
          {actions.map(action => {
            return (
              <span className="valign-wrapper center-align" onClick={(event) => {
                event.stopPropagation();
                action.handler(item);
              }}>
                { action.icon }
              </span>
            )
          })}
      </td>
    )
  }

  const recursiveAccess = (item, name) => {
    const layers = name.split('.');
    if(layers.length === 1) {
      return item[layers[0]];
    } else {
      return recursiveAccess(item[layers[0]], layers.slice(1).join('.'));
    }
  }

  const orderItemData = (item) => {
    const values = [];
    for(const col of columns) {
      const itemVal = col.modifier? col.modifier(recursiveAccess(item, col.name)) : recursiveAccess(item, col.name);
      values.push(itemVal);
    }
    return values;
  }

  const getOrderIndicator = () => {
    return (
      order === 'asc'
      ? <Icon>expand_less</Icon>
      : <Icon>expand_more</Icon>
    )
  }

  const getItemTR = (item) => {
    const orderedData = orderItemData(item);
    return (
      <tr>
        { orderedData.map(orderedItem => (
          <td 
            onClick={ handler?.bind(null, item) }
          >
            { orderedItem }
          </td>
        ))}
        { !!actions.length && getActions(item) }
      </tr>
    )
  }

  const sortStrings = (first, second) => {
    return first.localeCompare(second);
  }

  const sortNumbers = (first, second) => {
    return first - second;
  }

  const sortByOrder = (a, b, sortingFn) => {
    if(order === 'asc') {
      return sortingFn(a, b);
    } else {
      return sortingFn(b, a);
    }
  }

  const isSorter = (col) => {
    return col.name === sorter;
  }

  const getData = () => {
    if(sorter) {
      return [...data].sort(((itemA, itemB) => {
        const prev = itemA[sorter];
        const cur = itemB[sorter];
        if(prev === null || cur === null) return 0;
        if(typeof prev === 'string') {
          return  sortByOrder(
            prev,
            cur,
            sortStrings
          )
        } else if(typeof prev === 'number') {
          return sortByOrder(
            prev,
            cur,
            sortNumbers
          );
        } else if(prev === 'nope') {
          return sortByOrder(
            new Date(prev),
            new Date(cur),
            sortNumbers
          );
        }
      }))
    } else {
      return data;
    }
  }

  const generateTable = () => {
    return (
      <div className={`table-container ${classes}` }>
        <table className="responsive-table striped">
          <thead>
            <tr>
            {
              columns.map(col => <td 
                onClick={() => {
                  setSorter(col.name)
                  if(sorter === col.name) {
                    changeOrder();
                  } else {
                    changeOrder('asc');
                  }
                }}
              >
                <div className="valign-wrapper center-align">
                  <div>{ col.alias }</div>
                  <span className={ isSorter(col)? 'order-indicator' : 'order-indicator-off'}>
                    { isSorter(col)? getOrderIndicator() : <Icon>unfold_more</Icon>} 
                  </span>
                </div>
              </td>)
            }
            { !!actions.length && <td>Ações</td> }
            </tr>
          </thead>
          <tbody>
            {
              chunkArray(getData(), pageSize)[curPage].map(item => (
                getItemTR(item)
              ))
            }
          </tbody>
        </table>
    </div>
    )
  }

  return (
    <> 
      { data.length === 0 && emptyText
      ? <p className="empty">Nossa, que vazio! As novas informações
      que você adicionar poderão ser consultadas aqui :)</p> 
      : generateTable()}

      <div className="pagination-container">
        <div>
          <TextInput value={pageSize} handler={(e) => setPageSize(Number(e.target.value))} type="number">
            Items por página
          </TextInput>
        </div>
        <div className="pagination-numbers">
          { Array(pageCount).fill(0).map((_, i) => (
            <span className={i === curPage? 'selected' : ''} onClick={() => setCurPage(i)}>{ i + 1 }</span>
          )) }
        </div>
      </div>
    </>
  )
}