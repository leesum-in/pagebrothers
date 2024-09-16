import Modal from '@shared/components/modals/Modal';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Modals', //스토리북 왼쪽 UI구조
  component: Modal, //연결할 컴포넌트
  argTypes: {
    showHeader: { control: 'boolean' },
    showFooter: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn = (args) => {
  //Template은 기본 스토리 템플릿을 정의
  return (
    <Modal
      isOpen={true}
      onClose={() => alert('모달 닫힘')}
      {...args} // args로 전달된 props를 모달에 전달
    >
      {args.children} {/* children도 args로 동적으로 전달 */}
    </Modal>
  );
};

export const modal = Template.bind({}); // Template.bind({})로 Template을 복사해서 새로운 스토리만듬
modal.args = {
  //해당 스토리에서 사용할 기본 props 값을 설정
  showHeader: true,
  showFooter: true,
  headerContent: <h2>모달 헤더</h2>,
  footerContent: <h2>모달 푸터</h2>,
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
  showHeader: true,
  showFooter: true,
  headerContent: <h2>에드 모달 헤더</h2>,
  footerContent: <h2>에드 모달 푸터</h2>,
  children: <div>에드 모달 내용</div>,
}; //요런식
