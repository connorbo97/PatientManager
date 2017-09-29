import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => {
  if (active) {
    return (<span>
      <a className="selected"
        href= {"#/" + children}
        onClick={e => {
          e.preventDefault()
          onClick()
        }}
      >
        {children}
      </a>
    </span>
    )
  }
  return (
    <span>
    <a
      href={"#/" + children}
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  </span>

  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link