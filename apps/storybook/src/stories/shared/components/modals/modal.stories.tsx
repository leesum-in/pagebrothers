import { Modal } from '@shared/components/modals';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Shared/Components/Modals', //스토리북 왼쪽 UI구조
  component: Modal, //연결할 컴포넌트
} as Meta;

const Template: StoryFn = (args) => {
  //Template은 기본 스토리 템플릿을 정의
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
      >
        모달창 열기
      </button>
      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        isModalHeader={args.isModalHeader}
        isModalFooter={args.isModalFooter}
        modalHeader={args.modalHeader}
        modalFooter={args.modalFooter}
        // {...args} // args로 전달된 props를 모달에 전달
      >
        {args.children} {/* children도 args로 동적으로 전달 */}
      </Modal>
    </>
  );
};

export const modal = Template.bind({}); // Template.bind({})로 Template을 복사해서 새로운 스토리만듬
modal.args = {
  //해당 스토리에서 사용할 기본 props 값을 설정
  isModalHeader: true,
  isModalFooter: true,
  modalHeader: <h2>모달 헤더</h2>,
  modalFooter: <h2>모달 푸터</h2>,
  children: (
    <div>
      <div className=" bg-gray-100 px-10 py-20 ">첫 번째 블럭 내용</div>
      <div className=" bg-gray-100 px-10 py-10 mt-6">두번째 블럭 내용</div>
      <div className=" bg-gray-100 px-10 py-20 mt-6">세번째 블럭 내용</div>
    </div>
  ), // children도 args로 전달
};

export const addModal = Template.bind({});
addModal.args = {
  isModalHeader: true,
  isModalFooter: true,
  modalHeader: <h2>에드 모달 헤더</h2>,
  modalFooter: <h2>에드 모달 푸터</h2>,
  children: <div>에드 모달 내용</div>,
}; //테스트 하고싶은 모달 이런식으로 추가

//중첩모달 테스트
const MultiModalTemplate: StoryFn = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiModalOpen, setIMsultiModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
      >
        모달창 열기
      </button>
      <Modal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        isModalHeader={args.isModalHeader}
        isModalFooter={args.isModalFooter}
        modalHeader={args.modalHeader}
        modalFooter={args.modalFooter}
        zIndex={50}
        scale={1}
      >
        {args.children}
        <button
          onClick={() => setIMsultiModalOpen(true)}
          className="mt-4 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          중첩 모달 열기
        </button>
      </Modal>
      <Modal
        isModalOpen={isMultiModalOpen}
        onCloseModal={() => setIMsultiModalOpen(false)}
        isModalHeader={args.IsMultiModalHeader}
        isModalFooter={args.IsMultiModalFooter}
        modalHeader={args.MultiModalHeader}
        modalFooter={args.MultiModalFooter}
        zIndex={60}
        scale={0.75}
      >
        {args.MultiModalChildren}
      </Modal>
    </>
  );
};

export const MultiModal = MultiModalTemplate.bind({});
MultiModal.args = {
  isModalHeader: true,
  isModalFooter: true,
  modalHeader: <h2>첫 번째 모달 헤더</h2>,
  modalFooter: <h2>첫 번째 모달 푸터</h2>,
  children: (
    <div>
      <div className=" bg-gray-100 px-10 py-20 ">첫 번째 모달 내용</div>
      <div className=" bg-gray-100 px-10 py-10 mt-6">추가 내용</div>
    </div>
  ),

  IsMultiModalHeader: true,
  IsMultiModalFooter: true,
  MultiModalHeader: <h2>중첩 모달 헤더</h2>,
  MultiModalFooter: <h2>중첩 모달 푸터</h2>,
  MultiModalChildren: (
    <div>
      <div className=" bg-gray-100 px-10 py-20 ">중첩 모달 내용1</div>
      <div className=" bg-gray-100 px-10 py-20 mt-6">중첩 모달 내용2</div>
    </div>
  ),
};
