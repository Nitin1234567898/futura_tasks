import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";

const makeId = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
const STORAGE_KEY = "futura-tasks-v1";

const ConfettiCanvas = forwardRef(function ConfettiCanvas(_, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useImperativeHandle(ref, () => ({
    fire({ x, y, count = 80 }) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const originX = x - rect.left;
      const originY = y - rect.top;
      for (let i = 0; i < count; i += 1) {
        particlesRef.current.push({
          x: originX,
          y: originY,
          vx: (Math.random() - 0.5) * 6,
          vy: -Math.random() * 6 - 2,
          life: 0,
          ttl: 120 + Math.random() * 60,
          size: 3 + Math.random() * 4,
          hue: 170 + Math.random() * 120,
          spin: (Math.random() - 0.5) * 0.2,
          rot: Math.random() * Math.PI * 2,
        });
      }
      if (!animationRef.current) {
        animate();
      }
    },
  }));

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);

    particlesRef.current = particlesRef.current.filter((p) => {
      p.life += 1;
      p.vy += 0.08;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.spin;
      const alpha = 1 - p.life / p.ttl;
      if (alpha <= 0) return false;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha})`;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      ctx.restore();
      return true;
    });

    if (particlesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      animationRef.current = null;
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
});

function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId = null;
    const particles = [];
    const density = 750;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      const { width, height } = canvas.getBoundingClientRect();
      for (let i = 0; i < density; i += 1) {
        const ox = Math.random() * width;
        const oy = Math.random() * height;
        particles.push({
          x: ox,
          y: oy,
          ox,
          oy,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: 1 + Math.random() * 2.5,
          hue: 185 + Math.random() * 80,
        });
      }
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(4, 8, 20, 0.55)";
      ctx.fillRect(0, 0, width, height);

      const { x: mx, y: my, active } = mouseRef.current;
      for (const p of particles) {
        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 160) {
            const force = (160 - dist) / 160;
            p.vx += (dx / dist) * force * 0.18;
            p.vy += (dy / dist) * force * 0.18;
          }
        }

        const homeDx = p.ox - p.x;
        const homeDy = p.oy - p.y;
        p.vx += homeDx * 0.0022;
        p.vy += homeDy * 0.0022;

        const maxSpeed = 3.6;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          p.vx *= scale;
          p.vy *= scale;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, 0.9)`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.2;
            ctx.strokeStyle = `rgba(120, 220, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const handleResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMove = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    };
  };

  return (
    <canvas
      ref={canvasRef}
      className="bg-canvas"
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseRef.current.active = false;
      }}
    />
  );
}

function CompletionOverlay({ visible, groupName }) {
  return (
    <div className={`completion-overlay ${visible ? "show" : ""}`}>
      <div className="completion-card">
        <div className="completion-title">You completed the task!</div>
        <div className="completion-subtitle">Group: {groupName}</div>
        <div className="completion-echo">Well done.</div>
      </div>
      <div className="completion-ring" />
      <div className="completion-grid" />
    </div>
  );
}

export default function App() {
  const [groups, setGroups] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage parse errors
    }
    return [];
  });
  const [groupName, setGroupName] = useState("");
  const [taskInputs, setTaskInputs] = useState({});
  const [overlay, setOverlay] = useState({ visible: false, groupName: "" });
  const confettiRef = useRef(null);
  const overlayTimer = useRef(null);

  const totalTasks = useMemo(
    () => groups.reduce((sum, group) => sum + group.tasks.length, 0),
    [groups]
  );
  const doneTasks = useMemo(
    () =>
      groups.reduce((sum, group) => sum + group.tasks.filter((t) => t.done).length, 0),
    [groups]
  );

  const addGroup = (event) => {
    event.preventDefault();
    const name = groupName.trim();
    if (!name) return;
    setGroups((prev) => [
      ...prev,
      {
        id: makeId(),
        name,
        tasks: [],
      },
    ]);
    setGroupName("");
  };

  const addTask = (groupId, event) => {
    event.preventDefault();
    const value = (taskInputs[groupId] || "").trim();
    if (!value) return;
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
            ...group,
            tasks: [...group.tasks, { id: makeId(), text: value, done: false }],
          }
          : group
      )
    );
    setTaskInputs((prev) => ({ ...prev, [groupId]: "" }));
  };

  const deleteTask = (groupId, taskId) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, tasks: group.tasks.filter((task) => task.id !== taskId) }
          : group
      )
    );
  };

  const deleteGroup = (groupId) => {
    setGroups((prev) => prev.filter((group) => group.id !== groupId));
    setTaskInputs((prev) => {
      const next = { ...prev };
      delete next[groupId];
      return next;
    });
  };

  const toggleTask = (groupId, taskId, event) => {
    const { clientX, clientY } = event;
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        const updatedTasks = group.tasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task
        );

        const task = updatedTasks.find((t) => t.id === taskId);
        if (task?.done) {
          confettiRef.current?.fire({ x: clientX, y: clientY });
        }

        const allDone =
          updatedTasks.length > 0 && updatedTasks.every((taskItem) => taskItem.done);
        if (allDone && task?.done) {
          setOverlay({ visible: true, groupName: group.name });
          if (overlayTimer.current) clearTimeout(overlayTimer.current);
          overlayTimer.current = setTimeout(() => {
            setOverlay({ visible: false, groupName: "" });
          }, 2800);
        }

        return { ...group, tasks: updatedTasks };
      })
    );
  };

  useEffect(() => {
    return () => {
      if (overlayTimer.current) clearTimeout(overlayTimer.current);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    } catch {
      // ignore storage write errors
    }
  }, [groups]);

  return (
    <div className="app">
      <BackgroundCanvas />
      <ConfettiCanvas ref={confettiRef} />
      <CompletionOverlay visible={overlay.visible} groupName={overlay.groupName} />

      <header className="hero">
        <div className="hero-left">
          <div className="hero-label">Futura Task Grid</div>
          <h1>Orchestrate your missions in luminous focus.</h1>
          <p>
            Create a focused group for each mission and fill it with tasks. Mark each
            task complete to trigger a celebratory burst.
          </p>
        </div>
      </header>

      <aside className="side-dock">
        <div className="hero-right glass">
          <div className="stat">
            <span>Total tasks</span>
            <strong>{totalTasks}</strong>
          </div>
          <div className="stat">
            <span>Completed</span>
            <strong>{doneTasks}</strong>
          </div>
          <div className="stat">
            <span>Active groups</span>
            <strong>{groups.length}</strong>
          </div>
        </div>

        <section className="create-panel glass">
          <form onSubmit={addGroup}>
            <div className="field">
              <label htmlFor="group-name">Create a group</label>
              <input
                id="group-name"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder="New group name"
              />
            </div>
            <button type="submit" className="primary">
              Add group
            </button>
          </form>
        </section>
      </aside>

      <section className="group-grid">
        {groups.map((group) => {
          const completed = group.tasks.filter((task) => task.done).length;
          const total = group.tasks.length || 0;
          const progress = total ? Math.round((completed / total) * 100) : 0;
          return (
            <div className="group-card glass" key={group.id}>
              <div className="group-header">
                <div>
                  <h2>{group.name}</h2>
                  <div className="group-progress">
                    <span>{completed} completed</span>
                    <span>{progress}%</span>
                  </div>
                </div>
                <div className="group-actions">
                  <button
                    type="button"
                    className="danger"
                    onClick={() => deleteGroup(group.id)}
                  >
                    Delete group
                  </button>
                  <div className="progress-ring" style={{ "--progress": progress / 100 }}>
                    <div className="progress-ring-value">{progress}%</div>
                  </div>
                </div>
              </div>

              <form onSubmit={(event) => addTask(group.id, event)} className="task-form">
                <input
                  value={taskInputs[group.id] || ""}
                  onChange={(event) =>
                    setTaskInputs((prev) => ({ ...prev, [group.id]: event.target.value }))
                  }
                  placeholder="Add a task"
                />
                <button type="submit">Add</button>
              </form>

              <ul className="task-list">
                {group.tasks.length === 0 && (
                  <li className="task-empty">No tasks yet. Add one above.</li>
                )}
                {group.tasks.map((task) => (
                  <li key={task.id} className={`task ${task.done ? "done" : ""}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={(event) => toggleTask(group.id, task.id, event)}
                      />
                      <span>{task.text}</span>
                    </label>
                    <button
                      type="button"
                      className="icon"
                      onClick={() => deleteTask(group.id, task.id)}
                      aria-label={`Delete ${task.text}`}
                    >
                      x
                    </button>
                    <div className="task-glow" />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
}
