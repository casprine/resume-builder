import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './index.scss';
import { format } from 'date-fns';
import { ResumeBuilderProvider, useResumeBuilder } from './DataContext';

function getValueFromBlock(block, name) {
  return block?.content[name]?.formValue || '';
}

function formatDate(dateString: string) {
  return format(new Date(dateString), 'LLL y');
}

const generateBlankExperience = () => {
  return {
    id: `work-${String(new Date().getTime() / 1000)}`,
    type: 'work-experience',
    content: {
      companyName: '',
      roles: [
        {
          title: '',
          startDate: '',
          endDate: '',
        },
      ],

      highlights: [''],
    },
  };
};

const Resume = () => {
  return <div className="resume"></div>;
};

const AppContainer = () => {
  return (
    <ResumeBuilderProvider>
      <Resume />
    </ResumeBuilderProvider>
  );
};

export default AppContainer;
