import { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { ExperienceBlockType } from './components/ExperienceBlock';

export type BLOCK_TYPE = 'header' | 'work-experience';

const workExperience: Record<string, ExperienceBlockType> = {
  [`work-${String(new Date().getTime() / 1000)}`]: {
    id: `work-${String(new Date().getTime() / 1000)}`,
    companyName: 'ChipperCash',
    jobTitle: 'Software Engineer',
    startDate: '2018-11-01',
    location: 'Delaware, US',

    highlights: [
      {
        index: 1,
        highlight: 'Design system owner responsible for defining and maintaining design standards.',
      },
      {
        index: 2,
        highlight:
          'Led team of 13 designers, researchers, and content designers, to ensure craft, consistency, and solid user experiences across Mobile and Web. Created roadmaps, processes, and structure for the Design team.',
      },
      {
        index: 3,
        highlight: `Lead on the brand update project,working on market research, coordinating brand strategy, and
          executing on design solutions to refresh and elevate brand identity.`,
      },
    ],
  },
};

type ExperienceBlock = Record<string, ExperienceBlockType>;

type ResumeBuilderContextProps = {
  experienceBlocks: ExperienceBlockType[];
  selectedExperienceBlock?: ExperienceBlockType | null;
  selectExperienceBlock: (blockId: string) => void;
  updateExperienceBlock: (block: ExperienceBlockType) => void;
};

const ResumeBuilderContext = createContext<ResumeBuilderContextProps>({
  blocks: [],
  selectBlock: () => {},
  removeSelectedBlock: () => {},
  editHeaderField: () => {},
  updateWorkBlock: () => {},
  selectBlockCopy: () => {},
});

export const ResumeBuilderProvider = ({ children }: { children: React.ReactNode }) => {
  const [experienceBlocks, setExperienceBlock] = useState<ExperienceBlock>(workExperience);
  const [selectedExperienceBlock, setSelectedExperienceBlock] = useState<ExperienceBlockType | null>(null);

  const selectExperienceBlock = useCallback(
    (blockId: string) => {
      const block = experienceBlocks[blockId];
      if (block) {
        setSelectedExperienceBlock(block);
      }
    },
    [experienceBlocks],
  );

  const updateExperienceBlock = useCallback(
    (block: ExperienceBlockType) => {
      const updatedBlocks = { ...experienceBlocks };
      updatedBlocks[block.id] = block;
      setExperienceBlock(updatedBlocks);
      setSelectedExperienceBlock(null);
    },
    [experienceBlocks],
  );

  const values = useMemo(() => {
    return {
      experienceBlocks: Object.values(experienceBlocks),
      selectedExperienceBlock,
      selectExperienceBlock,
      updateExperienceBlock,
    };
  }, [experienceBlocks, updateExperienceBlock, selectExperienceBlock, selectedExperienceBlock]);

  return <ResumeBuilderContext.Provider value={values}>{children}</ResumeBuilderContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useResumeBuilder = () => {
  return useContext(ResumeBuilderContext);
};
