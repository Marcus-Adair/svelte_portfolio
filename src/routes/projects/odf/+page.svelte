<script lang="ts">
    import Link from "$lib/components/link.svelte";
    import Button from "$lib/components/ui/button.svelte";
	import Separator from "$lib/components/ui/separator.svelte";
	import { ChevronLeft } from "lucide-svelte";
    import workflowDiagram from "$lib/assets/odf_workflow_diagram.png"
    import cicdDiagram from "$lib/assets/ci_cd_diagram.png"
</script>

<svelte:head>
  <title>Projects - ODF</title>
</svelte:head>


<div class="flex flex-col gap-6">
    <div class="flex flex-row gap-6 items-center">
        <Button variant="ghost" size="icon-lg" href="/projects">
            <ChevronLeft class="size-8"/>
        </Button>
        <div class="flex flex-col gap-2 flex-1">
            <h1 class="text-4xl font-[Space_Grotesk]">On-Demand Fakequakes</h1>
    
            <div class="flex flex-row items-center gap-2 h-4">
                <Separator orientation="vertical" class="data-[orientation=vertical]:w-[3px]"/>
                <span class="text-sm text-muted-foreground">MS Project at the University of Utah, and research for work at the SCI Institute</span>
            </div>
        </div>
    </div>
    
    <Separator/>

    <span>
        For my Master's Project at the University I developed On-Demand Fakequakes, a Python-based 
        web application for launching earthuake simulation using the Python-based software <Link href={"https://github.com/UO-Geophysics/MudPy"}>MudPy</Link>.
        It was an amazing project that spanned a year May 2024 to May 2025. The project included a user interface (UI), a complex Amazon Web Services (AWS) workflow with infrastructure
        built as Python code, automatic deployement via GitHub Actions, and much more. 
    </span>

    <span>
        Unfortunately, months after graduation, the website (where the AWS costs were covered by a NASA grant) is no longer up. However, if you are reading this I want 
        to get the UI running on a public domain. I do not have enough high-quality images/videos as I wish I would have to show off the UI.
    </span>


    <span>
        The project began in the summer of 2024 when I did an internship at the University of Oregon working under Dr. Diego Melgar, a former collaborator. The goal was for me
        to build a web app with a good interface for launching MudPy earthquake simulations - a goal he had had for a while with his complex software package. This collaboration spawned
        from previous I did from 2022 to 2023, you can read about that in a published paper I authored <Link href="https://dl.acm.org/doi/10.1145/3624062.3624276">here</Link>.
    </span>

    <span>
        The UI was all built in Python using Plotly Dash. Post this project I have gained much more experience in React and Svelte, and now I wish would not have used Python for the front-end (haha).
        All of the UI was built with what was essentially Python wrappers around HTML and CSS, which was annoying but did help me to just learn something new.
    </span>

    <span>
        The UI essentially had a map where you could choose a predefined zone to simulate earthuakes from, then you could select all or a subset of thoursands (with different meshes to choose from) of polygons from a zone to utilize.
        Then users could essentially configure simple and advanced parameters (through the UI or a JSON file), enter their email, and hit a button to launch earthquake simulations (where the simulations ran on AWS EC2 instances).
    </span>

    <span>
        The project was much more that just a front-end. The goal turned out to be an enormous project that required a ton of engineering and development and a year's worth of time.
        Thus, when the internship ended I continued to work on the project and I tied it into my work and research at the SCI Institute. Over that time I build an entire automated workflow
        using AWS services (ECS Fargate, IAM Policies, Lambda Functions, etc.). 
    </span>



    <span>Here is a diagram I created using Figma to illustrate the flow and utilized technologies of On-Demand Fakequakes:</span>
    <div class="flex flex-col items-center gap-8">
        <img src={workflowDiagram} alt="Workflow Diagram" class="w-auto h-auto px-4"/>
        <span>
            This shows the flow from the front-end, that was deployed through AWS, which could trigger a JSON file (with simulation parameters) to be deposited
            into an S3 bucket and thus the larger workflow.
        </span>
     
    </div>


    <span>Here is a diagram that illustrates the high-level parts of the continuous integration/continuous deployment (CI/CD) pipeline for the app:</span>
    <div class="flex flex-col items-center gap-8">
        <img src={cicdDiagram} alt="CI/CD Diagram" class="max-w-auto h-auto px-4"/>
        <span>
            Through AWS <Link href="https://aws.amazon.com/cloudformation/">CloudFormation</Link> and <Link href="https://aws.amazon.com/cdk/">Cloud Development Kit</Link>, services that enables you to turn code into AWS infrastructure resources in an automated and secure manner,
            and GitHub Actions, I engineered a CI/CD pipeline. Updates to the Git repo would trigger AWS resource stacks to updated and deployed, Docker images to be rebuilt, the UI to be updated, and more without letting the live website go down.
        </span>
    </div>

    <span>
        In these efforts I dockerized my front-end app and the MudPy earthquake simulation software so they could run on AWS ECS instances. The entire infrastrure-as-code in Python was really cool.
        Theoretically I could have taken that code and deploy the workflow/resoources on other AWS account, but I never tried. I did take now the workflow and re-deploy it multiple time, and I got it back up pretty simply.
    </span>

    <span>
        A cool AWS service I utilized was <Link href="https://docs.aws.amazon.com/step-functions/">Step Functions</Link>. Step Functions allows me to create a DAG-like workflow between step in the workflow, and it provides automatic diagrams
        to visualize steps and dependencies, catch errors, degug, and more. 
    </span>

    <!-- TODO: add more -->
</div>

