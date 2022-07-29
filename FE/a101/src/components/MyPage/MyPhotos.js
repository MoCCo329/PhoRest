import * as React from 'react';
import './MyPhotos.css'

export default function MyPhotos() {
  return (
    <div className='container-gallery'>
      {itemData.map((item) => (
          <img className='image'
            key={item.title}
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
      ))}
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/flagged/photo-1563693703591-ef3a7e5d70d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'A',
  },
  {
    img: 'https://images.unsplash.com/photo-1603127160913-da5cda279c93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'B',
  },
  {
    img: 'https://images.unsplash.com/photo-1602692095685-d571be22806c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'C',
  },
  {
    img: 'https://images.unsplash.com/flagged/photo-1563692384431-67fcdc19ba94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'D',
  },
  {
    img: 'https://images.unsplash.com/photo-1605964604905-774647507505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'E',
  },
  {
    img: 'https://images.unsplash.com/flagged/photo-1563693703591-ef3a7e5d70d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'F',
  },
  {
    img: 'https://images.unsplash.com/photo-1603127160913-da5cda279c93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'G',
  },
  {
    img: 'https://images.unsplash.com/photo-1602692095685-d571be22806c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'H',
  },
  {
    img: 'https://images.unsplash.com/flagged/photo-1563692384431-67fcdc19ba94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'I',
  },
  {
    img: 'https://images.unsplash.com/photo-1605964604905-774647507505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBvbGFyb2lkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    title: 'J',
  },
];
