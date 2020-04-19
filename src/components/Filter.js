import React, { Component } from 'react';
export default class Products extends Component {

    render() {


        return (
            <div className="row" style={{ alignItem : 'center', justifySelf: 'center' }}> 
                <div className="col-md-3">
                <br/>
                <span className="focused" style={{ textAlign: 'center' }}>  {this.props.count} </span> products found.
                </div>

                <div className="col-md-4 ">

                    <label htmlFor="priceRange">Price Range: 0 - 
                    <span className="focused">{this.props.price}</span></label>
                    <input type="range" name="priceRange" min="0.01" max="150" step="0.01"
                    value={this.props.price}  onChange={this.props.handleChangePrice} 
                    />

                    </div>
                <div className="col-md-3">
                    <label>Order by
               <select className="form-control" value={this.props.sort} onChange={this.props.handleSortChange}>
                            <option value="">Select</option>
                            <option value="lowestprice">Lowest to highest</option>
                            <option value="highestprice">Highest to lowest</option>
                        </select>
                    </label>
                </div>
                <div className="col-md-2">
                    <label > Filter Size
               <select className="form-control" value={this.props.size} onChange={this.props.handleSizeChange}>
                            <option value="">ALL</option>
                            <option value="x">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                        </select>
                    </label>
                </div>
            </div>
        )
    }
}
