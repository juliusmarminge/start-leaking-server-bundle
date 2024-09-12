import { createFileRoute, useRouteContext } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const userId = useRouteContext({
    from: '__root__',
    select: (ctx) => ctx.userId,
  })

  return (
    <div className="p-2">
      <h3>Welcome Home {userId}!!!</h3>
    </div>
  )
}
