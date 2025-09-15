
type JsonViewerProps = {
  tile: {
    name: string;
    description: string;
    file: {
      name: string;
      uri: string;
    };
  };
};

const jsonData = {};


// nts: have a way to update the tile details when it opens the json. like, have a button:  
// "Update Tile Details" that updates the tile details with the json data.