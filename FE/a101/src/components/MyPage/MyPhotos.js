import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MyPhotos() {
  return (
    <ImageList sx={{ width: 350, height: 500 }} cols={3} rowHeight={100}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?fit=crop&auto=format`}
            srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/flagged/photo-1563693703591-ef3a7e5d70d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1603127160913-da5cda279c93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1602692095685-d571be22806c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/flagged/photo-1563692384431-67fcdc19ba94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1605964604905-774647507505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/flagged/photo-1563693703591-ef3a7e5d70d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1603127160913-da5cda279c93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1602692095685-d571be22806c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/flagged/photo-1563692384431-67fcdc19ba94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1605964604905-774647507505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'Hats',
  },
];
