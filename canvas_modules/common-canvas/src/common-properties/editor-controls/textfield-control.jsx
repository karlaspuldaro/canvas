/****************************************************************
** IBM Confidential
**
** OCO Source Materials
**
** SPSS Modeler
**
** (c) Copyright IBM Corp. 2016
**
** The source code for this program is not published or otherwise
** divested of its trade secrets, irrespective of what has been
** deposited with the U.S. Copyright Office.
*****************************************************************/

import React from 'react'
import {TextField} from 'ap-components-react/dist/ap-components-react'
import EditorControl from './editor-control.jsx'
import {CHARACTER_LIMITS} from '../constants/constants.js'

export default class TextfieldControl extends EditorControl {
  constructor(props) {
    super(props);
    this.state = {
      controlValue: props.valueAccessor(props.control.name)[0]
    };
    this.getControlValue = this.getControlValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      controlValue: evt.target.value
    });
  }

  getControlValue() {
    return [this.state.controlValue];
  }

  render() {
		let disablePlaceHolder = true;
		//only enable if additionText is available
		if (this.props.control.additionalText){
			disablePlaceHolder=false;
		}
    return (
      <TextField
        type="text"
        id={this.getControlID()}
        disabledPlaceholderAnimation={disablePlaceHolder}
				placeholder={this.props.control.additionalText}
        onChange={this.handleChange}
        value={this.state.controlValue}
        maxCount={CHARACTER_LIMITS.NODE_PROPERTIES_DIALOG_TEXT_FIELD}
        maxLength={CHARACTER_LIMITS.NODE_PROPERTIES_DIALOG_TEXT_FIELD}/>
    );
  }
}

TextfieldControl.propTypes = {
  control: React.PropTypes.object
};
