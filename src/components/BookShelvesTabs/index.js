import './index.css'

const BookShelvesTabs = props => {
  const {activeTabValue, tabDetails, tabChange, labelChange} = props
  const {value, label} = tabDetails

  const onCllickTabButton = () => {
    tabChange(value)
    labelChange(label)
  }
  const activeTabBtnClassName =
    activeTabValue === value ? 'active-tab-button' : ''
  return (
    <li>
      <button
        className={`tab-button ${activeTabBtnClassName}`}
        type="button"
        onClick={onCllickTabButton}
      >
        {label}
      </button>
    </li>
  )
}

export default BookShelvesTabs
