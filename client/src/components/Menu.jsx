import React from 'react';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [],
      searchQuery: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
  }

  componentDidMount() {
    // Fetch the menu items from the server
    fetch('http://localhost:8080/api/menu')
      .then((res) => res.json())
      .then((menuItems) => this.setState({ menuItems }))
      .catch((err) => console.error(err));
  }

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleDragStart(event, menuItem) {
    // When starting to drag a menu item, set its data as a JSON object
    // on the drag event so that it can be dropped later
    
    // const data = JSON.stringify(menuItem);
    event.dataTransfer.setData('text/plain', menuItem.name);
  }

  render() {
    const { menuItems, searchQuery } = this.state;

    // Filter the menu items based on the search query
    const filteredItems = menuItems.filter((item) => {
      const { name, category, type } = item;
      const lowerCaseSearchQuery = searchQuery.toLowerCase();

      return (
        name.toLowerCase().includes(lowerCaseSearchQuery) ||
        category.toLowerCase().includes(lowerCaseSearchQuery) ||
        type.toLowerCase().includes(lowerCaseSearchQuery)
      );
    });

    return (
   
    <div className='overflow-auto bg-pink-100 relative h-96 w-100'>

        <div>
        <input
  type="text"
  placeholder="Search"
  className="border-2 border-gray-300 p-2 w-50 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
  value={searchQuery}
  onChange={this.handleSearchChange}
/>

        </div>
        <div >
          <table className="table-auto">
            <thead>
              <tr>
                <th className="w-1/6 px-0 py-2">Number</th>
                <th className="w-2/6 px-0 py-2">Name</th>
                <th className="w-1/6 px-0 py-2">Price</th>
                <th className="w-1/6 px-0 py-2">Category</th>
                <th className="w-1/6 px-0 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr
                  key={item._id}
                  draggable
                  onDragStart={(event) => this.handleDragStart(event, item)}
                >
                  <td className="border px-0 py-1">{index + 1}</td>
                  <td className="border px-0 py-1">{item.name}</td>
                  <td className="border px-0 py-1">{item.price}</td>
                  <td className="border px-0 py-1">{item.category}</td>
                  <td className="border px-0 py-1">{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
    
    );
  }
}

export default Menu;
