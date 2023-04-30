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
   
    <div className='overflow-auto text-gray rounded-2xl bg-white px-5 py-5 relative h-96 w-100'>

        <div className='py-5'>
        <input
  type="text"
  placeholder="Search"
  className="border-2 border-gray-300 p-2 w-80 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
  value={searchQuery}
  onChange={this.handleSearchChange}
/>

        </div>
        <div >
          <table className="table-auto border-hidden ">
            <thead>
              <tr className='border-hidden'>
              
                <th className="w-2/6 px-1 py-2 border-hidden ">Name</th>
                <th className="w-1/6 px-0 py-2 border-hidden ">Price</th>
                <th className="w-1/6 px-0 py-2 border-hidden ">Category</th>
                <th className="w-1/6 px-0 py-2 border-hidden ">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr
                  key={item._id}
                  draggable
                  onDragStart={(event) => this.handleDragStart(event, item)}
                >
                 
                  <td className="border px-2 py-1 border-hidden">{item.name}</td>
                  <td className="border px-2 py-1 border-hidden">{item.price}</td>
                  <td className="border px-2 py-1 border-hidden">{item.category}</td>
                  <td className="border px-1 py-1 border-hidden">{item.type}</td>
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
