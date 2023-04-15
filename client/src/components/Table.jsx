import { useState } from "react";
import Icon from "./Icon";
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
  actions = []
}) {
  const [sorter, setSorter] = useState('');
  const [order, setOrder] = useState('asc');

  
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
              <div className="" onClick={(event) => {
                event.stopPropagation();
                action.handler(item);
              }}>
                { action.icon }
              </div>
            )
          })}
      </td>
    )
  }

  const orderItemData = (item) => {
    const values = [];
    for(const col of columns) {
      const itemVal = col.modifier? col.modifier(item[col.name]) : item[col.name];
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

  return (
    <div className={ `table-container ${classes}` }>
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
                <span>{ col.alias }</span>
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
            getData().map(item => (
              getItemTR(item)
            ))
          }
        </tbody>
      </table>
    </div>
  )
}