'use client'

import * as React from 'react';

import Contactus from '@/components/contactus'
import Header from '@/components/ui/header'


export default function Contact() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto  px-4  pt-32  text-center">
      <Contactus />
      </div>
    </>
  );
}