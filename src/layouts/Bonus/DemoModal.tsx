import { useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

export function DemoModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold uppercase tracking-wide">Modal</h1>
      <div className="flex justify-center">
        <Button onClick={() => setIsModalOpen(true)}>
          <span>Open Modal</span>
          <span>&rarr;</span>
        </Button>
        <Modal uuid="modal" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          quibusdam. Velit sunt perspiciatis voluptatum quibusdam veritatis
          itaque laboriosam ipsa iure. Sapiente similique deleniti odio sequi
          nobis, ipsa excepturi corrupti beatae?
        </Modal>
      </div>
    </>
  );
}
