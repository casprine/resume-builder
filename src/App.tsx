import './index.scss';
import { StoreProvider, useStore } from './store';
import { ExperienceBlock } from './components/ExperienceBlock';
import { ExperienceBlockEditor } from './components/ExperienceBlockEditor';

const Resume = () => {
  const { experienceBlocks } = useStore();

  return (
    <>
      <div className="resume">
        <ExperienceBlockEditor />
        {experienceBlocks.map((experience) => {
          return <ExperienceBlock experience={experience} key={experience.id} />;
        })}
      </div>
    </>
  );
};

const AppContainer = () => {
  return (
    <StoreProvider>
      <Resume />
    </StoreProvider>
  );
};

export default AppContainer;
