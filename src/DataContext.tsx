import { createContext, FC, useState, useContext, useMemo, useCallback } from 'react';

export type BLOCK_TYPE = 'header' | 'work-experience';

type Block = {
  id: string;
  type: BLOCK_TYPE;
  content: any; // define later
};

const workExperience: Block = {
  id: `work-${String(new Date().getTime() / 1000)}`,
  type: 'work-experience',
  content: {
    companyName: 'ChipperCash',
    roles: [
      {
        title: 'Design lead',
        startDate: '2018-11-01',
        endDate: '2020-01-01',
      },
    ],

    highlights: [
      'Design system owner responsible for defining and maintaining design standards.',
      `Led team of 13 designers, researchers, and content designers, to ensure craft, consistency, and solid
       user experiences across Mobile and Web. Created roadmaps, processes, and structure for the Design team.`,
      `Lead on the brand update project,working on market research, coordinating brand strategy, and
                  executing on design solutions to refresh and elevate brand identity.`,
    ],
  },
};

const headerBlockSample: Block = {
  type: 'header',
  id: `header-${String(new Date().getTime() / 1000)}`,
  content: {
    name: {
      formType: 'string',
      formValue: 'Jon Dang',
    },

    phone: {
      formType: 'string',
      formValue: '571.225.5960',
    },
    email: {
      formType: 'string',
      formValue: 'jondang@gmail.com',
    },

    location: {
      formType: 'string',
      formValue: 'San Francisco, CA',
    },
  },
};

type ResumeBuilderContextProps = {
  blocks: Block[];
  headerBlock?: Block;
  selectedBlock?: Block | null;
  selectBlock: (blockId: string) => void;
  removeSelectedBlock: () => void;
  editHeaderField: (headerBlock: any) => void;
  updateWorkBlock: (block: any) => void;
  selectBlockCopy: (block: Block) => void;
};

const ResumeBuilderContext = createContext<ResumeBuilderContextProps>({
  blocks: [],
  selectBlock: () => {},
  removeSelectedBlock: () => {},
  editHeaderField: () => {},
  updateWorkBlock: () => {},
  selectBlockCopy: () => {},
});

export const ResumeBuilderProvider: FC = ({ children }) => {
  const [blocks, setBlocks] = useState<Block[] | []>([headerBlockSample, workExperience]);

  const [selectedBlock, setSelectBlock] = useState<Block | null>(null);

  const selectBlock = useCallback(
    (blockId: string) => {
      const block = blocks.filter((block: Block) => block.id === blockId)?.[0];
      setSelectBlock(block);
    },
    [blocks],
  );

  const headerBlock = useMemo(() => {
    if (selectedBlock && selectedBlock.type === 'header') return selectedBlock;
  }, [selectedBlock]);

  const editHeaderField = useCallback(
    (props) => {
      const updatedBlock = {
        ...headerBlock,
        content: props,
      };

      const updateBlocks = [...blocks.filter((block) => block.id !== updatedBlock.id), updatedBlock];

      setBlocks(updateBlocks as Block[]);
      setSelectBlock(null);
    },
    [blocks, headerBlock],
  );

  const updateWorkBlock = useCallback(
    (props) => {
      const updatedBlocks = [...blocks.filter((block) => block.id !== props.id), props];

      setBlocks(updatedBlocks as Block[]);
      setSelectBlock(null);
    },
    [blocks],
  );

  const values = useMemo(() => {
    return {
      blocks,
      selectedBlock,
      selectBlock,
      headerBlock,
      removeSelectedBlock: () => setSelectBlock(null),
      editHeaderField,
      updateWorkBlock,
      selectBlockCopy: (props: Block) => {
        setSelectBlock(props);
      },
    };
  }, [blocks, updateWorkBlock, selectBlock, selectedBlock, headerBlock, editHeaderField]);

  return <ResumeBuilderContext.Provider value={values}>{children}</ResumeBuilderContext.Provider>;
};

export const useResumeBuilder = () => {
  return useContext(ResumeBuilderContext);
};
