"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "@/lib/validations/auth";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@nextui-org/react";
import { Icons } from "./Icons";

const NewTaskModal = ({ buttonType }: { buttonType: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // react-hook-form
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof taskSchema>) {
    // TODO
  }

  return (
    <>
      {buttonType === "big" ? (
        <div
          onClick={onOpen}
          className="flex relative items-center justify-center w-[360px] max-[360px]:w-fit h-48 max-h-48 rounded-xl border-2 border-dashed border-border gap-4 py-4 cursor-pointer hover:bg-muted hover:border-muted-foreground group z-20"
        >
          <Icons.Plus className="text-muted-foreground group-hover:text-foreground" />
          <p className="text-muted-foreground group-hover:text-foreground">
            Create New Task
          </p>
        </div>
      ) : (
        <>
          <div className="hidden min-[800px]:flex gap-2">
            <Button
              className="bg-secondary text-nav-primary font-normal z-20"
              color="primary"
              variant="solid"
              onPress={onOpen}
              startContent={<Icons.Plus />}
            >
              Create New Task
            </Button>

            <Button
              className="flex min-[1400px]:hidden bg-secondary font-normal z-20"
              color="primary"
              isIconOnly
            >
              <div className="flex items-center justify-center gap-[4px]">
                <span className="h-[4px] w-[4px] bg-nav-primary rounded-full"></span>
                <span className="h-[4px] w-[4px] bg-nav-primary rounded-full"></span>
                <span className="h-[4px] w-[4px] bg-nav-primary rounded-full"></span>
              </div>
            </Button>
          </div>

          <ButtonGroup className="flex min-[800px]:hidden z-20">
            <Button
              isIconOnly
              onPress={onOpen}
              className="min-w-unit-12 w-12 h-10 hover:bg-muted cursor-pointer z-50 bg-muted data-[hover=true]:bg-muted text-nav-primary"
            >
              <Icons.Plus />
            </Button>
            <Button
              isIconOnly
              className="min-w-unit-12 w-12 h-10 hover:bg-muted cursor-pointer z-50 bg-muted data-[hover=true]:bg-muted"
            >
              <div className="flex items-center justify-center gap-[4px]">
                <span className="h-[4px] w-[4px] bg-nav-primary rounded-full"></span>
                <span className="h-[4px] w-[4px] bg-nav-primary rounded-full"></span>
                <span className="h-[4px] w-[4px] bg-nav-primary rounded-full"></span>
              </div>
            </Button>
          </ButtonGroup>
        </>
      )}

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        className="bg-secondary"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-medium">Create New Task</ModalHeader>
              <ModalBody className="pb-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 w-full text-nav-primary"
                  >
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <FormControl>
                              <Input
                                id="title"
                                placeholder="Example Title"
                                className="rounded-lg h-10 border-border fill-none"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="description">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                id="description"
                                placeholder="Type your description here"
                                className="border-border resize-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border rounded-lg"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex relative top-2 w-full place-content-end gap-2">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                          className="text-muted-foreground hover:text-nav-primary hover:bg-nav-background rounded-[10px] hover:ring-2 hover:ring-border"
                        >
                          Close
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          className="text-nav-primary bg-nav-background rounded-[10px] hover:ring-2 hover:ring-border"
                        >
                          Create Task
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewTaskModal;
