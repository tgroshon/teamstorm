import React from 'react'

export default React.createClass({
  getInitialState() {
    // check the first block of comment in `setCheckedRadio`
    return {defaultValue: this.props.defaultValue}
  },

  componentDidMount() {
    this.setRadioNames()
    this.setCheckedRadio()
  },

  componentDidUpdate() {
    this.setRadioNames()
    this.setCheckedRadio()
  },

  setRadioNames() {
    // stay DRY and don't put the same `name` on all radios manually. Put it on
    // the tag and it'll be done here
    var $radios = this.getRadios()
    for (var i = 0, length = $radios.length; i < length; i++) {
      $radios[i].setAttribute('name', this.props.name)
    }
  },

  getRadios() {
    return this.getDOMNode().querySelectorAll('input[type="radio"]')
  },

  getCheckedValue() {
    var $radios = this.getRadios()

    for (var i = 0, length = $radios.length; i < length; i++) {
      if ($radios[i].checked) {
        return $radios[i].value
      }
    }
  },

  setCheckedRadio() {
    var $radios = this.getRadios()
    // if `value` is passed from parent, always use that value. This is similar
    // to React's controlled component. If `defaultValue` is used instead,
    // subsequent updates to defaultValue are ignored. Note: when `defaultValue`
    // and `value` are both passed, the latter takes precedence, just like in
    // a controlled component
    var destinationValue = this.props.value != null
      ? this.props.value
      : this.state.defaultValue

    for (var i = 0, length = $radios.length; i < length; i++) {
      var $radio = $radios[i]

      // intentionally use implicit conversion for those who accidentally used,
      // say, `valueToChange` of 1 (integer) to compare it with `value` of "1"
      // (auto conversion to valid html value from React)
      if ($radio.value == destinationValue) {
        $radio.checked = true
      }
    }
  },

  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    )
  }
})
