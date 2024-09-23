import { Modal, ModalFooter, ModalHeader } from '@shared/components/modals';
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
        modalHeader={
          <ModalHeader
            modalHeaderTitle={args.modalHeaderTitle}
            modalHeaderOnClose={args.modalHeaderOnClose}
            modalHeaderTabs={args.modalHeaderTabs}
            modalHeaderSubtitle={args.modalHeaderSubtitle}
            isHeaderModalTabs={args.isHeaderModalTabs}
            isHeaderSubtitle={args.isHeaderSubtitle}
          />
        }
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
  isHeaderModalTabs: true,
  isHeaderSubtitle: true,
  modalHeaderTitle: '모달 헤더',
  modalHeaderOnClose: () => alert('모달 닫기'),
  modalHeaderTabs: ['메뉴1', '메뉴2', '메뉴3'],
  modalHeaderSubtitle: '모달 작은 글씨가 표시.',
  modalFooter: (
    <ModalFooter
      onApplyBtn={() => alert('적용하기 클릭')}
      onPreviewBtn={() => alert('미리보기 클릭')}
      applyBtnLabel="적용하기"
      previewBtnLabel="미리보기"
    />
  ),
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
  isHeaderModalTabs: true,
  isHeaderSubtitle: true,
  modalHeaderTitle: '에드 모달',
  modalHeaderOnClose: () => alert('에드 모달 닫기'),
  modalHeaderTabs: ['에드1', '에드2'],
  modalHeaderSubtitle: '에드 작은 글씨 표시',
  modalFooter: (
    <ModalFooter
      onApplyBtn={() => alert('에드 적용하기 클릭')}
      onPreviewBtn={() => alert('에드 미리보기 클릭')}
      applyBtnLabel="에드적용"
      previewBtnLabel="에드미리"
    />
  ),
  children: <div className=" bg-gray-100 px-10 py-10 ">에드 모달 내용</div>,
}; //테스트 하고싶은 모달 이런식으로 추가

//중첩모달 테스트
const MultiModalTemplate: StoryFn = (args) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);

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
        modalHeader={
          <ModalHeader
            modalHeaderTitle={args.modalHeaderTitle}
            modalHeaderOnClose={args.modalHeaderOnClose}
            modalHeaderTabs={args.modalHeaderTabs}
            modalHeaderSubtitle={args.modalHeaderSubtitle}
            isHeaderModalTabs={args.isHeaderModalTabs}
            isHeaderSubtitle={args.isHeaderSubtitle}
          />
        }
        modalFooter={args.modalFooter}
        zIndex={50}
      >
        <button
          onClick={() => setIsMultiModalOpen(true)}
          className="mt-4 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          중첩 모달 열기
        </button>
        {args.children}
      </Modal>
      <Modal
        isModalOpen={isMultiModalOpen}
        onCloseModal={() => setIsMultiModalOpen(false)}
        isModalHeader={args.IsMultiModalHeader}
        isModalFooter={args.IsMultiModalFooter}
        modalHeader={
          <ModalHeader
            modalHeaderTitle={args.MultiModalHeaderTitle}
            modalHeaderOnClose={args.MultiModalHeaderOnClose}
            modalHeaderTabs={args.MultiModalHeaderTabs}
            modalHeaderSubtitle={args.MultiModalHeaderSubtitle}
            isHeaderModalTabs={args.IsMultiModalHeaderTabs}
            isHeaderSubtitle={args.IsMultiModalHeaderSubtitle}
          />
        }
        modalFooter={args.MultiModalFooter}
        zIndex={60} //중첩 모달 z-인덱스
        isMultiModal={true} // 중첩 모달 props
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
  isHeaderModalTabs: true,
  isHeaderSubtitle: true,
  modalHeaderTitle: '모달',
  modalHeaderOnClose: () => alert('모달 닫기'),
  modalHeaderTabs: ['모달1', '모달2', '모달3'],
  modalHeaderSubtitle: '작은 글씨 표시랄랄라',
  modalFooter: (
    <ModalFooter
      onApplyBtn={() => alert('적용하기 클릭')}
      onPreviewBtn={() => alert('미리보기 클릭')}
      applyBtnLabel="적용하기"
      previewBtnLabel="미리보기"
    />
  ),
  children: (
    <div>
      <div className=" bg-gray-100 px-10 py-20 ">첫 번째 모달 내용</div>
      <div className=" bg-gray-100 px-10 py-10 mt-6">추가 내용1</div>
      <div className=" bg-gray-100 px-10 py-10 mt-6">추가 내용2</div>
    </div>
  ),

  IsMultiModalHeader: true,
  IsMultiModalFooter: true,
  IsMultiModalHeaderTabs: true,
  IsMultiModalHeaderSubtitle: true,
  MultiModalHeaderTitle: '중첩 모달',
  MultiModalHeaderOnClose: () => alert('중첩 모달 닫기'),
  MultiModalHeaderTabs: ['중첩1', '중첩2'],
  MultiModalHeaderSubtitle: '중첩 모달 작은 글씨',
  MultiModalFooter: (
    <ModalFooter
      onApplyBtn={() => alert('중첩적용하기 클릭')}
      onPreviewBtn={() => alert('중첩미리보기 클릭')}
      applyBtnLabel="중첩적용"
      previewBtnLabel="중첩미리"
    />
  ),
  MultiModalChildren: (
    <div>
      <div className=" bg-gray-100 px-10 py-20 ">중첩 모달 내용1</div>
      <div className=" bg-gray-100 px-10 py-20 mt-6">중첩 모달 내용2</div>
    </div>
  ),
};
