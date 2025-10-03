import { useMutation, useQueryClient } from "@tanstack/react-query"
import { signUp } from "../auth.service"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


export const useRegister = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      navigate("/")
    },
    onError: (error) => {
      toast.error(error.message, {
        position: 'bottom-right'
      })
    }
  })

  return {
    mutate,
    isPending
  }
}
