import axios from 'axios';

const { data } = await axios.post(
      'https://admin-workspace.azurewebsites.net/posts',
      {
        title: 'my article',
        content: 'my super article content'
      }
    );

    console.log(data);