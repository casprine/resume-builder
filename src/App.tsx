import './index.scss';
import { ResumeBuilderProvider, useResumeBuilder } from './store';
import { ExperienceBlock } from './components/ExperienceBlock';

const Resume = () => {
  const { experienceBlocks } = useResumeBuilder();
  return (
    <div className="resume">
      {experienceBlocks.map((experience) => {
        return <ExperienceBlock experience={experience} key={experience.id} />;
      })}
    </div>
  );
};

const AppContainer = () => {
  return (
    <ResumeBuilderProvider>
      <Resume />
    </ResumeBuilderProvider>
  );
};

export default AppContainer;
