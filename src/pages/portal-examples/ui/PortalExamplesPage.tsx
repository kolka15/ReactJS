import { Link } from 'react-router-dom'

import { ConfirmDialogDemo } from 'features/portalExamples/ConfirmDialogDemo.tsx'
import { PortalShowcase } from 'features/portalExamples/PortalShowcase.tsx'
import { TooltipEventsDemo } from 'features/portalExamples/TooltipEventsDemo.tsx'
import { TooltipStyleIsolationDemo } from 'features/portalExamples/TooltipStyleIsolationDemo.tsx'
import { ROUTES } from 'shared/config/routes.ts'
import { Tooltip } from 'shared/ui/Tooltip/Tooltip.tsx'
import { TooltipPosition } from 'shared/ui/Tooltip/TooltipPosition.ts'

import styles from './PortalExamplesPage.module.css'

export const PortalExamplesPage = () => (
  <main>
    <p>
      <Link to={ROUTES.home}>← На главную</Link>
    </p>
    <h1>React.Portal</h1>

    <section>
      <h2>Tooltip</h2>
      <div className={styles.row}>
        <Tooltip content="Портал сверху" position={TooltipPosition.Top}>
          <button type="button">Сверху</button>
        </Tooltip>
        <Tooltip content="Портал снизу" position={TooltipPosition.Bottom}>
          <button type="button">Снизу</button>
        </Tooltip>
        <Tooltip content="Портал слева" position={TooltipPosition.Left}>
          <button type="button">Слева</button>
        </Tooltip>
        <Tooltip content="Портал справа" position={TooltipPosition.Right}>
          <button type="button">Справа</button>
        </Tooltip>
      </div>
    </section>

    <TooltipEventsDemo />

    <TooltipStyleIsolationDemo />

    <ConfirmDialogDemo />

    <PortalShowcase />
  </main>
)
