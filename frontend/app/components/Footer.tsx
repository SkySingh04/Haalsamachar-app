'use client';
import React from 'react';
import { IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LinkedIn } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {

  return (
      <footer className="footer items-center   p-6 z-50 flex justify-center   bg-black text-bt-peach ">
        <aside className="items-center grid-flow-col">
          <p>Made By <b>Akash Singh</b> and <a href="https://github.com/Akash-Singh04/HaalSamachar/graphs/contributors"><u>Contributors</u></a> © 2024 - All rights reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <IconButton
            className='text-bt-navy'
            color="inherit"
            href="https://github.com/Akash-Singh04"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            className='text-bt-navy'
            color="inherit"
            href="https://www.linkedin.com/in/akash-singh-a57081253/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            className='text-bt-navy'
            color="inherit"
            href="https://www.instagram.com/kind.of.akash/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
        </nav>
      </footer>
  );
};

export default Footer;